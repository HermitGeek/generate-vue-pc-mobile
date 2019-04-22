import localforage from 'localforage';



export default localforage.createInstance({
    driver: [

        // remove support for WEBSQL, the specification work has stopped
        // https://dev.w3.org/html5/webdatabase/
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE
    ],
    name: 'WeireFE'
});
