import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/e2e',fullyParallel:false,workers:1,retries:process.env.CI?1:0,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:3107',trace:'retain-on-failure',reducedMotion:'reduce'},
 projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}],
 webServer:{command:'npm run start -- --hostname 127.0.0.1 --port 3107',url:'http://127.0.0.1:3107',reuseExistingServer:false,timeout:60000,env:{AI_API_KEY:'',RESEND_API_KEY:'',NEXT_PUBLIC_SITE_URL:'http://127.0.0.1:3107'}}
});
