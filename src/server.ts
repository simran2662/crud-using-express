import express, { Request, Response } from 'express';
import jsonServer from 'json-server';
import bodyParser from 'body-parser';


interface Employee {
  id: number;
  name: string;
  position:string;
  salary:number;
  
}

const app = express();
const routes = jsonServer.router<{ employees: Employee[] }>('db.json'); // Specify the type of the JSON data


app.use(bodyParser.json());
app.use('/api', routes);


app.post('/employees', (req: Request, res: Response) => {
  const newEmployee: Employee = req.body; 
  routes.db.get('employees').push(newEmployee).write();
  res.json(newEmployee);
});

app.get('/employees', (req: Request, res: Response) => {
  const employees: Employee[] = routes.db.get('employees').value();
  res.json(employees);
});


app.put('/employees/:id', (req: Request, res: Response) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee: Employee = req.body; 
  routes.db.get('employees').find({ id: employeeId }).assign(updatedEmployee).write();
  res.json(updatedEmployee);
});

app.delete('/employees/:id', (req: Request, res: Response) => {
  const employeeId = parseInt(req.params.id);
  routes.db.get('employees').remove({ id: employeeId }).write();
  res.sendStatus(204);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
