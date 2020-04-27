package com.weidian.lib.hera.sample;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.tencent.smtt.sdk.WebView;
import com.weidian.lib.hera.main.HeraService;

public class DebugX5Activity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.debug_activity);

        WebView wv=(WebView) findViewById(R.id.web);
        wv.loadUrl("http://debugx5.qq.com ");
    }

}
