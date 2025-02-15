---
sidebar_position: 7
title: Heart Rate/Heart Rate Variability
---

Depending on which source of data the readings will come from, the Heart Rate module can be used to collect Heart Rate, Heart Rate Variaibility and Classification. For Heart rate, the module records how many times a patient’s heart beats per minute. A healthy heart rate is between 60 and 100 bpm but can be affected by certain heart conditions, stress, anxiety, etc. 

Heart rate variability measures the difference between your individual heartbeats. These fluctuations are undetectable without a specialised device, but can indicate current or future health problems, including heart conditions and mental health issues like anxiety and depression.

Classification is the given outcome of the heart beat rhythm. The heart’s normal rhythm is between 60 and 100 beats per minute (bpm) while you are resting. Huma provides 2 possible heart rate classification outcome using Happitech's medical grade, Class IIa CE-certified SDK - Atrial Fibrillation and Normal Sinus Rhythm.

## How it works

Patients have a number of ways in which to collect their heart rate reading:

- connecting the Huma App to Apple Health or Google Fit
- taking the reading manually  
- using their smartphone camera to take the reading

Using the smartphone camera collection method also gives the user a heart rate variability and classification reading. When configuring the module, the admin can select which readings and sources should be available (maximum 2 sources per deployment). For example, deployments can choose to only have the heart rate reading from the smartphone camera source, instead of Heart Rate, Heart Rate Variaibility and Classification.

The time and date is added automatically at the moment they make the entry (although this can be edited if needed). 

![Adding heart rate to the Huma App](./assets/heart-rate.png)

Patients can view their historic reading results in a graph. In the Clinician Portal, care teams will be able to easily see the latest readings from their patients and any concerning readings will be flagged.  

![View patient heart rate in the Clinician Portal](./assets/cp-patient-list-heart-rate.png)

The Patient Summary displays a more detailed view of the patient's historic readings in graph or table form.

![View patient heart rate in the Clinician Portal](./assets/cp-module-details-heart-rate.png)
