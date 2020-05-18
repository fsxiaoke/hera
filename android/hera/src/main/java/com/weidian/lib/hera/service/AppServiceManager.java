package com.weidian.lib.hera.service;

import android.app.Activity;

import com.weidian.lib.hera.api.ApisManager;
import com.weidian.lib.hera.config.AppConfig;
import com.weidian.lib.hera.main.HeraActivity;

import java.util.HashMap;
import java.util.Map;

public class AppServiceManager {

    private static Map<String,AppService> sAppServiceMap = new HashMap<>();

    public static AppService getAppService(String appId){
        AppService appService = sAppServiceMap.get(appId);
        if(appService != null && !appService.getApisManager().getBindActivity().isFinishing()){
            return appService;
        }
        return null;
    }


    public static AppService createAppService(HeraActivity activity, String appId, String userId){
        AppConfig  mAppConfig = new AppConfig(appId, userId);

        //3. 创建ApiManager，管理Api的调用
        ApisManager mApisManager = new ApisManager(activity, activity, mAppConfig);
        mApisManager.onCreate();
        AppService mAppService = new AppService(activity, activity, mAppConfig, mApisManager);

        sAppServiceMap.put(appId, mAppService);
        return mAppService;
    }

    public static void removeAppService(String appId){
        sAppServiceMap.remove(appId);
    }
}
