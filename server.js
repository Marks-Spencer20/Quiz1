const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Mongoose models for Patient, Encounter, and Vitals
    constPatient = mongoose.model('Patient',{
        ID:2345,
        Surname:'John',
        Othername:'Siaw',
        Gender: true,
        Date: new Date,
        PhoneNumber: 1234878,
        ResidentialAdress: 'Oba St.12',
        contact: 234567890009,
        Emergency: 'OPD',
    });

const Encounter = mongoose.model('Encounter', {
    PatientID:2345,
    Surname:'John',
    Othername:'Siaw',
    Gender: true,
    Date: new Date,
    PhoneNumber: 1234878,
    RelationshipWithPatient: 'brother',
    Emergency: 'OPD',
    contact: 234567890009,
});

const Vitals = mongoose.model('Vitals', {
  BloodPressure: '100KbPa',
  Temperature: '39 Celsius',
  Pulse: '50KbPa',
  TimeTaken: new Date,
});

app.use(bodyParser.json());

// Endpoint to register a new patient
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to start an encounter for a patient
app.post('/encounters', async (req, res) => {
  try {
    const encounter = new Encounter(req.body);
    await encounter.save();
    res.status(201).json(encounter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to submit patient vitals
app.post('/vitals/:patientId', async (req, res) => {
  try {
    const vitals = new Vitals(req.body);
    await vitals.save();
    res.status(201).json(vitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint to get a list of all patients
app.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Endpoint to get details of a specific patient
  app.get('/patients/:patientId', async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.patientId);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Start the server
  app.listen(PORT, () => {
      console.log('Server is running on http://localhost:4000');
    });



