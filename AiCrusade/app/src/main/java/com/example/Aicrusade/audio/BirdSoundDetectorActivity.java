package com.example.Aicrusade.audio;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.media.AudioRecord;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.Aicrusade.BirdDetailActivity;
import com.example.Aicrusade.helpers.MLAudioHelperActivity;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;

import org.tensorflow.lite.support.audio.TensorAudio;
import org.tensorflow.lite.support.label.Category;
import org.tensorflow.lite.task.audio.classifier.AudioClassifier;
import org.tensorflow.lite.task.audio.classifier.Classifications;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

public class BirdSoundDetectorActivity extends MLAudioHelperActivity {

    String modelPath = "my_birds_model.tflite";
    float probabilityThreshold = 0.3f;
    AudioClassifier classifier;
    private TensorAudio tensor;
    private AudioRecord record;
    private TimerTask timerTask;

    String lat;
    String longitude;
    String city;



    private final static int REQUEST_CODE=100;

    public void onStartRecording(View view) {
        super.onStartRecording(view);

        wanttoknow.setText("You are Hearing");



//        enterbutton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                getLocations();
//            }
//        });

        try {
            classifier = AudioClassifier.createFromFile(this, modelPath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Creating an audio recorder
        tensor = classifier.createInputTensorAudio();

        // showing the audio recorder specification
        TensorAudio.TensorAudioFormat format = classifier.getRequiredTensorAudioFormat();


        // Creating and start recording
        record = classifier.createAudioRecord();
        record.startRecording();

        timerTask = new TimerTask() {
            @Override
            public void run() {
                Log.d(BirdSoundDetectorActivity.class.getSimpleName(), "timer task triggered");
                // Classifying audio data
                // val numberOfSamples = tensor.load(record)
                // val output = classifier.classify(tensor)
                int numberOfSamples = tensor.load(record);
                List<Classifications> output = classifier.classify(tensor);

                // Filtering out classifications with low probability
                List<Category> finalOutput = new ArrayList<>();
//                for (Classifications classifications : output) {
                for (Category category : output.get(0).getCategories()) {
                    if (category.getLabel().equals("Bird") && category.getScore() > probabilityThreshold) {
                        finalOutput.add(category);
                    }
                }
//                }

                if (finalOutput.isEmpty()) {
                    return;
                }

                finalOutput = new ArrayList<>();
                for (Category category : output.get(1).getCategories()) {
                    if (category.getScore() > probabilityThreshold) {
                        finalOutput.add(category);
                    }
                }

                // Sorting the results
                Collections.sort(finalOutput, (o1, o2) -> (int) (o1.getScore() - o2.getScore()));

                // Creating a multiline string with the filtered results
                StringBuilder outputStr = new StringBuilder();
                for (Category category : finalOutput) {
                    outputStr.append(category.getLabel());
//                            .append(": ").append(category.getScore())
//                            .append(", ").append(category.getDisplayName()).append("\n");
                }

                // Updating the UI
                List<Category> finalOutput1 = finalOutput;
                runOnUiThread(() -> {
                    if (finalOutput1.isEmpty()) {
//                        outputTextView.setText("Could not identify the bird");
                    } else {

                        chirping.setText(outputStr.toString());

//                        outputTextView.setText(outputStr.toString());
//                        Log.i("BIrd name",outputStr.toString());
                    }
                });
            }
        };

        new Timer().scheduleAtFixedRate(timerTask, 1, 500);
    }

    public void onStopRecording(View view) {
        super.onStopRecording(view);

        timerTask.cancel();
        record.stop();
        if(chirping.getText()!=null){
            Log.i("BIrd",chirping.getText().toString());
            getLocations();

            String text =chirping.getText().toString();
            FirebaseDatabase.getInstance().getReference().child("bird").child(chirping.getText().toString()).child("name").setValue(chirping.getText().toString()).addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                    Toast.makeText(BirdSoundDetectorActivity.this, "Data added sucessfully in Firebase", Toast.LENGTH_SHORT).show();
                }
            });

            Intent intent= new Intent(BirdSoundDetectorActivity.this, BirdDetailActivity.class);
            intent.putExtra("name",text);
            intent.putExtra("latitude",lat);
            intent.putExtra("longitude",longitude);
            intent.putExtra("city",city);
            startActivity(intent);
        }
    }

    private void getLocations() {
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)== PackageManager.PERMISSION_GRANTED){

            FusedLocationProviderClient loaction = LocationServices.getFusedLocationProviderClient(this);
            loaction.getLastLocation().addOnSuccessListener(new OnSuccessListener<Location>() {
                @Override
                public void onSuccess(android.location.Location location) {
                    Geocoder geocoder= new Geocoder(BirdSoundDetectorActivity.this, Locale.getDefault());
                    try {
                        List<Address> address= geocoder.getFromLocation(location.getLatitude(),location.getLongitude(),1);
                        lat= String.valueOf(address.get(0).getLatitude());
                        longitude=String.valueOf(address.get(0).getLongitude());
                        city= address.get(0).getLocality();
                        String country=address.get(0).getCountryName();

                        HashMap<String,Object> map1 = new HashMap<>();
                        map1.put("name",chirping.getText().toString());
                        map1.put("latitude",lat);
                        map1.put("longitude",longitude);
                        map1.put("location",city);

                        FirebaseDatabase.getInstance().getReference().child("bird").child(chirping.getText().toString()).setValue(map1).addOnCompleteListener(new OnCompleteListener<Void>() {
                            @Override
                            public void onComplete(@NonNull Task<Void> task) {
                                Toast.makeText(BirdSoundDetectorActivity.this, "Data added sucessfully in Firebase", Toast.LENGTH_SHORT).show();
                            }
                        });

                        Date c = Calendar.getInstance().getTime();
                        System.out.println("Current time => " + c);

                        SimpleDateFormat df = new SimpleDateFormat("dd-MMM-yyyy", Locale.getDefault());
                        String formattedDate = df.format(c);


                        HashMap<String,Object> map = new HashMap<>();
                        map.put("birdname",chirping.getText().toString());
                        map.put("latitude",lat);
                        map.put("longitude",longitude);
                        map.put("city", city);
                        map.put("country",country);
                        map.put("Date",formattedDate);


                        FirebaseDatabase.getInstance().getReference().child("userdata").child(mAuth.getCurrentUser().getUid()).child(chirping.getText().toString())
                                .child(formattedDate).setValue(map).addOnCompleteListener(new OnCompleteListener<Void>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Void> task) {
                                        Log.i("Bird added","bird Data Added Sucessfully");
                                    }
                                });

                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }


                }
            });

        }else{
            ActivityCompat.requestPermissions(BirdSoundDetectorActivity.this,new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION
            },REQUEST_CODE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        if(requestCode==REQUEST_CODE){

            getLocations();
        }else{
            Toast.makeText(this, "PLease ENable location Acess", Toast.LENGTH_LONG).show();
        }

        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}

