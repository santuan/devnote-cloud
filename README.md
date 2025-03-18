`Status playground - Disclaimer: I'm learning Vue and not a native english speaker. That said - Feel free to use it for testing and learning purposes.`

_See [another version of the same app but you can import and export DB to a json file](#another-version-with-import-and-export)_

## Intro

DevNote is a `PWA` (Progressive Web App) for creating notes that uses the local storage capabilities of browsers (such as IndexedDB) to work without needing an internet connection after first load. 

This version use `Dexie Cloud` for logging with OTP and as a sync engine. The data as far as i understand is NOT encrypted but [can be done.](https://dexie.org/cloud/docs/authentication#encrypting-your-offline-data).


![A screen shot of the app](https://github.com/santuan/devnote-cloud/blob/main/public/screen-demo.png)

<a href="https://stackblitz.com/~/github.com/santuan/devnote-cloud">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>


## Setting up Dexie Cloud

**Disclaimer**: This is beyond my understanding.

Get your `databaseUrl`, `clientId` and `clientSecret`. [Follow the awesome Dexie documentation](https://dexie.org/cloud/#getting-started) it's pretty straight forward.

### Create a file `dexie-cloud.json`

```json
{
  "serviceUrl": "https://dexie.cloud",
  "dbUrl": "https://[[your_database_url]].dexie.cloud"
}
```

### Create another file  ```dexie-cloud.key```

```json
{
  "https://[[database_url]].dexie.cloud": {
    "clientId": "[[your_cliend_id]]",
    "clientSecret": "[[your_client_secret]]"
  }
}
```

### Edit `.env.example` and rename it to `.env`. Replace with your database url.

it looks something like this

https://[your-dexie-cloud-url-here].dexie.cloud

```env
VITE_DBURL=your_dexie_cloud_url
```

### Don forget to whitelist your app origin(s).

```bash
## https://manager.dexie.cloud/
npx dexie-cloud whitelist http://localhost:4173
npx dexie-cloud whitelist http://localhost:5173
npx dexie-cloud whitelist https://some-random-url.ngrok-free.app/
```


---

# Local Installation

```bash
git clone https://github.com/santuan/devnote-cloud
npm install
```

```bash
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint --fix",
  "format": "prettier --write src/",
  "devnote": "npm run build && npm run preview" 
},
```

## Frontend & Backend

### **Backend**

*   [Dexie Cloud](\"https://dexie.org/cloud/\") A sync service for Dexie.js

*   [Dexie.js](\"https://dexie.org/\") A minimalist wrapper for IndexedDB.
    

### Frontend

*   [Vue.js](\"https://vuejs.org/guide/introduction.html#what-is-vue\") 💚
    
*   [RxJS](\"https://rxjs.dev/\") Reactive Extensions for modern JavaScript.

*   [VueUse](\"https://vueuse.org/\") Utility collection for Vue.
   
*   [TipTap](\"https://tiptap.dev/product/editor\") Rich text editor.

*   [Shiki](\"https://shiki.style/guide/install\") Syntax highlighting.
    
*   [RadixVue](\"https://www.radix-vue.com/\") Accessible components for building design systems and web applications.
    
*   [Pinia](\"https://pinia.vuejs.org/\") State management.
    
*   [TailwindCSS](\"https://tailwindcss.com/\")
    
*   [MediumZoom](\"https://github.com/francoischalifour/medium-zoom\") To enlarge images (preview mode only).
    
*   [Driver.js](\"https://driverjs.com/docs/installation\") For product tours.
    
*   [Vue-Sooner](\"https://vue-sonner.vercel.app/\") - Floating notifications.
    

<br>
<br>


## Another version with import and export

This version persist only in the browser session as IndexedDb. The database can be imported and exported as a JSON file. 

<a href="hhttps://stackblitz.com/~/github.com/santuan/devnote?startScript=devnote">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a>