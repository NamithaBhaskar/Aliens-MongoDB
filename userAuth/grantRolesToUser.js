db.grantRolesToUser("mongouser", [{ role: "readAlien", db: "Aliens" }])
// ReadWrite for Comments colletion
db.grantRolesToUser("mongouser", [{ role: "readWriteComments", db: "Aliens" }])

db.grantRolesToUser("mongoadmin", [{ role: "allAccess", db: "Aliens" }])