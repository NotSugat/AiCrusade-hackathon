package com.example.Aicrusade;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.squareup.picasso.Picasso;

public class BirdDetailActivity extends AppCompatActivity {

    TextView birdname;
    TextView birdscientificname;
    ImageView image;
    TextView occurence;
    TextView diet;
    TextView migratingroute;
    TextView overview;

    String data;

    private static final int MY_PERMISSIONS_REQUEST_SEND_SMS =0 ;
    MediaPlayer player ;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bird_detail);

        birdname=findViewById(R.id.birdname);
        birdscientificname=findViewById(R.id.birdscientificname);
        image=findViewById(R.id.image);
        occurence=findViewById(R.id.occurence);
        diet=findViewById(R.id.diet);
        migratingroute=findViewById(R.id.migratingroute);
        overview=findViewById(R.id.overview);
        player= MediaPlayer.create(BirdDetailActivity.this,R.raw.alarm);



        Intent intent= getIntent();
        String name = intent.getStringExtra("name");
        String lat =intent.getStringExtra("latitude");
        String longitude =intent.getStringExtra("longitude");
        String city = intent.getStringExtra("city");
        Log.i("Name ",name);

        FirebaseDatabase.getInstance().getReference().child("birdspecs").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for(DataSnapshot dataSnapshot:snapshot.getChildren()){

                    if(dataSnapshot.child("name").getValue().equals(name)){
                        Log.i("Data Found","Data Added");

                        birdname.setText(dataSnapshot.child("name").getValue().toString());
                        birdscientificname.setText(dataSnapshot.child("scientificName").getValue().toString());
                        occurence.setText(dataSnapshot.child("habitat").getValue().toString());
                        diet.setText(dataSnapshot.child("nutrition").getValue().toString());
                        overview.setText(dataSnapshot.child("overview").getValue().toString());
//                        migratingroute.setText(dataSnapshot.child("migratingroute").getValue().toString());

                        Picasso.get().load(dataSnapshot.child("image").getValue().toString()).into(image);
                    }

                    if(dataSnapshot.child("type").getValue().equals("rare")){

                        data = "Endangered species Detected\n" +
                                "Bird Name: " + name + "\n" +
                                "Location: " + city + "\n" +
                                "Latitude: " + lat + "\n" +
                                "Longitude: " + longitude;

                        Log.i("DAta",data);

                        sendSMSMessage();




                        player.start();
                        sendAlert(name,city,player);
                    }

                    if(dataSnapshot.child("type").getValue().equals("endangered")){
//                        data= "Endangered species Detected " +
//                                "Bird Name:"+name + "location:" +city + "latitude:" + lat + "longitude:" + longitude;

                        data = "Endangered species Detected\n" +
                                "Bird Name: " + name + "\n" +
                                "Location: " + city + "\n" +
                                "Latitude: " + lat + "\n" +
                                "Longitude: " + longitude;
                        sendSMSMessage();

                        player.start();
                        sendAlert(name,city,player);
                    }

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });

    }

    private void sendAlert(String name, String city, MediaPlayer player) {
        new AlertDialog.Builder(BirdDetailActivity.this)
                .setTitle(name + "Rare Bird Found")
                .setMessage("Bird found in "+ city)

                // Specifying a listener allows you to take an action before dismissing the dialog.
                // The dialog is automatically dismissed when a dialog button is clicked.
                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        player.stop();
                        dialog.dismiss();
                    }
                })

                // A null listener allows the button to dismiss the dialog and take no further action.
                .setNegativeButton("No", null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }


    protected void sendSMSMessage() {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.SEND_SMS)
                != PackageManager.PERMISSION_GRANTED) {
            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.SEND_SMS)) {
                // You can add an explanation here if needed
            } else {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.SEND_SMS},
                        MY_PERMISSIONS_REQUEST_SEND_SMS);
            }
        } else {
            // You should send the SMS here, not in onRequestPermissionsResult
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage("+9779845476276", null, data, null, null);
            Toast.makeText(getApplicationContext(), "SMS sent.", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_SEND_SMS: {
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // Permission granted, now send the SMS
                    sendSMSMessage();
                } else {
                    Toast.makeText(getApplicationContext(),
                            "SMS failed, please try again.", Toast.LENGTH_LONG).show();
                }
            }
        }
    }





}