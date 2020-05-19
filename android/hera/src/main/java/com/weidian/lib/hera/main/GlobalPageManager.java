package com.weidian.lib.hera.main;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import java.util.Stack;

public class GlobalPageManager {

    private static GlobalPageManager instance = new GlobalPageManager();
    private boolean mInHera; //是否进入首个小程序
    private Stack<Activity> mActivityStack = new Stack<>();

    private static byte[] locker = new byte[0];

    private GlobalPageManager(){}
    public static GlobalPageManager getInstance() {
        synchronized(locker){
            return instance;
        }
    }

    public void init(Application context) {
        context.registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle bundle) {
                if(!mInHera){
                    if(activity instanceof HeraActivity){
                        mInHera = true;
                    }
                }
                if(mInHera){
                    mActivityStack.push(activity);
                }
            }

            @Override
            public void onActivityStarted(Activity activity) {

            }

            @Override
            public void onActivityResumed(Activity activity) {

            }

            @Override
            public void onActivityPaused(Activity activity) {

            }

            @Override
            public void onActivityStopped(Activity activity) {

            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle bundle) {

            }

            @Override
            public void onActivityDestroyed(Activity activity) {
                if(mInHera){
                    mActivityStack.remove(activity);
                    if(activity instanceof HeraActivity){
                        mInHera = isInHera();
                    }
                }
            }
        });
    }

    private boolean isInHera(){
        for(Activity a: mActivityStack){
            if(a instanceof  HeraActivity){
                return true;
            }
        }
        return false;
    }

    /**
     * 向前回退页面
     * @param delta 回退几个页面
     * @return
     */
    public boolean navigateBackPage(int delta){
        if(mActivityStack.size()>=delta){
            for(int i =0; i < delta; i++){
                Activity activity = mActivityStack.pop();
                if(activity != null && !activity.isFinishing()){
                    activity.finish();
                }
            }
            return true;
        }
        return false;
    }


    /**
     * 获取同一个小程序的上个页面
     * @param appId
     * @return
     */
    public HeraActivity getTopHeraActivity(String appId){
        int len = mActivityStack.size();
        for(int i=len-1; i>=0;i--){
            Activity a = mActivityStack.get(i);
            if(a instanceof  HeraActivity){
                HeraActivity heraActivity = (HeraActivity) a;
                if(heraActivity.getAppId().equals(appId)){
                    return heraActivity;
                }
            }
        }
        return null;
    }

    public HeraActivity getTopHeraActivity(){
        int len = mActivityStack.size();
        for(int i=len-1; i>=0;i--){
            Activity a = mActivityStack.get(i);
            if(a instanceof  HeraActivity){
                HeraActivity heraActivity = (HeraActivity) a;
                return heraActivity;
            }
        }
        return null;
    }


}
