// Imports
import { Router } from "express";
import { get_tags } from "../controllers/tag_controller.js";

// Constants
const tags_router = Router();

// GET /api/tags
tags_router.get("/tags", (req, res) => {
    get_tags()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                "server error": "Failed to get tags. Internal server error."
            });
        });
});

// Exports
export default tags_router;