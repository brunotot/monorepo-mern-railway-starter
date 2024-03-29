//import { Form, Types } from "@tsvdec/core";
import { Form } from "@tsvdec/core";
export function validateForm(clazz) {
    return function (req, res, next) {
        const form = new Form(clazz);
        const body = req.body;
        const result = form.validate(body);
        if (!result.valid) {
            console.log(result);
            return res.status(400).json(result);
        }
        next();
    };
}
//# sourceMappingURL=validateForm.js.map