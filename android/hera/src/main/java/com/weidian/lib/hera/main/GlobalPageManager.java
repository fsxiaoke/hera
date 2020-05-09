package com.weidian.lib.hera.main;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import java.util.Stack;

public class GlobalPageManager {

    private static GlobalPageManager instance = new GlobalPageManager();
    private boolean mIsMiniMode; //是否进入首个小程序
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
                if(!mIsMiniMode){
                    if(activity instanceof HeraActivity){
                        mIsMiniMode = true;
                    }
                }
                if(mIsMiniMode){
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
                if(mIsMiniMode){
                    mActivityStack.remove(activity);
                    if(activity instanceof HeraActivity){
                        mIsMiniMode = dealMiniMode();
                    }
                }
            }
        });
    }

    private boolean dealMiniMode(){
        for(Activity a: mActivityStack){
            if(a instanceof  HeraActivity){
                return true;
            }
        }
        return false;
    }

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


}
