package com.example.Aicrusade;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    String phoneNo;
    String message;
    private static final int MY_PERMISSIONS_REQUEST_SEND_SMS =0 ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button enterbutton = findViewById(R.id.enter);
        enterbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MediaPlayer player = MediaPlayer.create(MainActivity.this,R.raw.alarm);
                player.start();
            }
        });







//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
//        String currentDate = sdf.format(new Date());

//        Date c = Calendar.getInstance().getTime();
//        System.out.println("Current time => " + c);
//
//        SimpleDateFormat df = new SimpleDateFormat("dd-MMM-yyyy", Locale.getDefault());
//        String formattedDate = df.format(c);
//
//        Log.i("DAte",formattedDate);



//        SmsManager smsManager = SmsManager.getDefault();
//        smsManager.sendTextMessage("+9779845476276", null, "sms message", null, null);
//
//        sendSMSMessage();
    }
//    protected void sendSMSMessage() {
//
//
//        if (ContextCompat.checkSelfPermission(this,
//                Manifest.permission.SEND_SMS)
//                != PackageManager.PERMISSION_GRANTED) {
//            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
//                    Manifest.permission.SEND_SMS)) {
//            } else {
//                ActivityCompat.requestPermissions(this,
//                        new String[]{Manifest.permission.SEND_SMS},
//                        MY_PERMISSIONS_REQUEST_SEND_SMS);
//            }
//        }
//    }
//
//
//    @Override
//    public void onRequestPermissionsResult(int requestCode,String permissions[], int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        switch (requestCode) {
//            case MY_PERMISSIONS_REQUEST_SEND_SMS: {
//                if (grantResults.length > 0
//                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                    SmsManager smsManager = SmsManager.getDefault();
//                    smsManager.sendTextMessage(phoneNo, null, message, null, null);
//                    Toast.makeText(getApplicationContext(), "SMS sent.",
//                            Toast.LENGTH_LONG).show();
//                } else {
//                    Toast.makeText(getApplicationContext(),
//                            "SMS faild, please try again.", Toast.LENGTH_LONG).show();
//                    return;
//                }
//            }
//        }
//
//    }
}