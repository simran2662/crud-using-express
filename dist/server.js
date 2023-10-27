"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const json_server_1 = __importDefault(require("json-server"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const jsonServerMiddleware = json_server_1.default.router('db.json'); // Specify the type of the JSON data
const middlewares = json_server_1.default.defaults();
app.use(middlewares);
app.use(body_parser_1.default.json());
app.use('/api', jsonServerMiddleware);
// Custom routes for CRUD operations
app.post('/employees', (req, res) => {
    // Handle employee creation
    const newEmployee = req.body; // Annotate the type of newEmployee
    jsonServerMiddleware.db.get('employees').push(newEmployee).write();
    res.json(newEmployee);
});
app.put('/employees/:id', (req, res) => {
    // Handle employee update
    const employeeId = parseInt(req.params.id);
    const updatedEmployee = req.body; // Annotate the type of updatedEmployee
    jsonServerMiddleware.db.get('employees').find({ id: employeeId }).assign(updatedEmployee).write();
    res.json(updatedEmployee);
});
app.delete('/employees/:id', (req, res) => {
    // Handle employee deletion
    const employeeId = parseInt(req.params.id);
    jsonServerMiddleware.db.get('employees').remove({ id: employeeId }).write();
    res.sendStatus(204);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
