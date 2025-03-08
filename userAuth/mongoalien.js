db.createRole({
   role: "allAccess",
   privileges: [
      {
         resource: { db: "Aliens", collection: "" },
         actions: [ "find", "insert", "update", "remove" ]
      }
   ],
   roles: []
})