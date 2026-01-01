# ESLint Warnings Fix TODO

- [x] Remove unused import 'DoctorDashboard' from App.js
- [x] Remove unused import 'Avatar' from AdminDashboard.jsx
- [x] Remove unused import 'Alert' from Register.jsx
- [x] Fix unnecessary escape characters in regex in Register.jsx
- [x] Remove unused 'userData' assignment in Register.jsx
- [x] Remove unused import 'Paper' from SecretaryDashboard.jsx
- [x] Fix useEffect dependency in PatientForm.jsx: add useCallback for loadPatient and include in deps
- [ ] Fix useEffect dependency in PatientDetail.jsx: add useCallback for loadPatient and include in deps (PatientDetails.jsx is not implemented yet, no useEffect present)
- [x] Run npm start to verify warnings are resolved
