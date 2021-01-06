package com.quizowanie;
import org.devio.rn.splashscreen.SplashScreen;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.pgsqlite.SQLitePluginPackage;

public class MainActivity extends ReactActivity  {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }


  @Override
  protected String getMainComponentName() {
    return "Quizowanie";
  }

}
