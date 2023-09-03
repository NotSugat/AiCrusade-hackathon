package com.example.Aicrusade.helpers;
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.Aicrusade.R;
import com.google.firebase.auth.FirebaseAuth;

public abstract class MLAudioHelperActivity extends AppCompatActivity {
    public final static int REQUEST_RECORD_AUDIO = 2033;

    protected TextView outputTextView;

    protected Button startRecordingButton;
    protected Button stopRecordingButton;
    protected TextView wanttoknow;
    protected TextView chirping;
    protected FirebaseAuth mAuth;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_audio_helper);

        mAuth=FirebaseAuth.getInstance();


//        outputTextView = findViewById(R.id.textViewOutput);

        wanttoknow=findViewById(R.id.wanttoknow);
        chirping=findViewById(R.id.chirping);

        startRecordingButton = findViewById(R.id.hearit);
        stopRecordingButton = findViewById(R.id.explorebird);

        stopRecordingButton.setEnabled(false);

        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, REQUEST_RECORD_AUDIO);
        }
    }

    public void onStartRecording(View view) {
        startRecordingButton.setEnabled(false);
        stopRecordingButton.setEnabled(true);
    }

    public void onStopRecording(View view) {
        startRecordingButton.setEnabled(true);
        stopRecordingButton.setEnabled(false);
    }

}