// Runs after `npx cap add android`: immersive fullscreen (no status/nav bars), auto-rotate, notch support.
const fs = require('fs');
const base = 'android/app/src/main';
let m = fs.readFileSync(base + '/AndroidManifest.xml', 'utf8');
m = m.replace('<activity', '<activity android:screenOrientation="fullSensor"');
fs.writeFileSync(base + '/AndroidManifest.xml', m);
const dir = base + '/java/com/puyoparty/anniversary';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(dir + '/MainActivity.java', `package com.puyoparty.anniversary;

import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    hideBars();
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) hideBars();
  }

  private void hideBars() {
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
    WindowInsetsControllerCompat c = new WindowInsetsControllerCompat(getWindow(), getWindow().getDecorView());
    c.hide(WindowInsetsCompat.Type.systemBars());
    c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
  }
}
`);
let s = fs.readFileSync(base + '/res/values/styles.xml', 'utf8');
s = s.replace(/(<style name="AppTheme\.NoActionBar"[^>]*>)/, '$1\n        <item name="android:windowFullscreen">true</item>\n        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>');
fs.writeFileSync(base + '/res/values/styles.xml', s);
console.log('Android patched');
