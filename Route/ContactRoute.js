const express = require("express");
const {getAllContacts,createContacts,deleteContacts,updateContacts,getContactsById
} = require("../Controller/contactController");
const validation = require("../middleware/validationHandler");

const router = express.Router();

router.use(validation)

router.route("/").get(getAllContacts);

router.route("/:id").get(getContactsById);

router.route("/").post(createContacts);

router.route("/:id").patch(updateContacts);

router.route("/:id").delete(deleteContacts);

module.exports = router;
