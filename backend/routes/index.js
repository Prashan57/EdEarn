import { Router } from "express";

const router = Router();

router.get("/hello", (req, res) => {
  return res.json("hello");
});

export default router;
