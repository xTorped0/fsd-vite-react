# How to deal with current structure

## Preface and main goal 
First of all, a wanna to emphasize that current architecture isn't perfect and i'm open to all ideas and suggestions that can improve this arch. The reason why i decided to choose this architecture is simple: there is a minimum of two-way communication between modules and understandable `FSD's` documentation which underlies this architecture. It was also decided to use technologies React, RTK with Query, React Router. Also, I'm highly recommended to use typescript here. Specifacally in our project we use `Antd` but achitecture have to be built in such a way than UI design language could be changed in few hours without any troubles. Links to documentation are presented below (at the end of this file)

## Quick guide
To setup main api links u should change `.env` file that located in the root of the project, some additional settings u can easely find in `config.ts` file that is next to `.env` file 
> feel free adding something of your own to the config but be careful think over whether it is needed globally.

All env variables is presented in project if they are started from `REACT_APP_VAR_NAME` and u can get it using process env like this: `process.env.REACT_APP_VAR_NAME`. Also config file available globally `window.config`.
  
- **To install** dependencies u have to download and install `NodeJs` with `npm`. After that navigate to project root and use `npm i` in terminal to install all dependencies.
- **To start** project type `npm run dev`.
- **To build** project type `npm run build`.

### Folders structure 
There are 6 layers in total, arranged from most responsibility and dependency to least:

A file system tree, with a single root folder called src and then seven subfolders: app, pages, widgets, features, entities, shared. The processes folder is slightly faded out.
1. App
2. Pages
3. Widgets
4. Features
5. Entities
6. Shared
*More about layers and main concepts u can find out on FSD official site*
   
> U can get each of them from alias `@` with adding layer name, like `@pages`

Slices and Segments are simular to presented on official site but have one additional folder's level coz application is big and without additional separation at some point will lool like a dump.
So structure is look like this 
 -Layer, like, `pages`
 --Sub Application name, like, `auth`
 ---Segment, like, `api`

> **IMPORTANT** You must add index file at root of Sub Application Folder and Mustn't import anything from App layer if it isn't presented in aliases

### Store And Main Functions 

- To subscribe to user login or logout u can use functions from shared api `import { subOnAuth, unsubFromAuth } from "@shared/api";` and pass a listener into them that has only one argument. It is string that equal to 'login' of 'logout'. Where can it be useful? For example, u can use it when u wanna to subscribe to MQTT topic that has user id or something simular.
- To add new requests u should use apiSlice `import { apiSlice } from "@api/apiSlice"` and insert new methods using `injectEndpoints` **Additional info how to use RTK Query u can find at official site. Link is presented below**
- To create store use any available options for creating storage from `RTK` but I recommended to use slices. You can add created slice in `src/app/store/index.ts`
- To subscribe on / unsubscribe from mqtt topic u can use:

  import { MQTT };
  type TListener = (payload: string, tail: string) => void;
  //
  MQTT.subscribe(topic: string, listener: TListener);
  MQTT.unsubscribe(topic: string, listener: TListener);

### Styles

In our project we use `SASS` preprocessor but `scss` syntax. Module styles are available `styles.module.scss`. If u import styles globally u should use 
BEM methodology



## Links
[FSD](https://feature-sliced.design/docs)
[BEM methodology](https://en.bem.info/methodology/)
[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
[RTK](https://redux-toolkit.js.org/introduction/getting-started)

  
