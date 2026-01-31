# TripGuardian AI 🚨

TripGuardian AI is a fully offline, on-device tourist safety monitoring system that detects health or crime emergencies and escalates SOS alerts to nearby police and doctors when connectivity becomes available.

## 🚀 Why On-Device AI?
- No cloud APIs
- No data leakage
- Works in dead zones
- Zero latency responses

## 🧠 Core Features
- Offline emergency detection (health + crime)
- Intelligent SOS escalation (SMS, Bluetooth relay)
- Zero-trace privacy (RAM-only inference)
- Situational AI reasoning
- Pre-risk safety alerts

## 🏗 Architecture
User Sensors / Voice  
→ Local Whisper (STT)  
→ RunAnywhere Core  
→ DeepSeek-R1-Distill (Reasoning)  
→ LLaMA-3-3B (Guidance)  
→ Local Alerts + SOS

## 🧩 Model Strategy
- Whisper-tiny (on-device STT)
- DeepSeek-R1-Distill (4–8 bit quantized)
- LLaMA-3-3B (low-latency dialogue)

## 📵 Offline Scenario
A tourist in a rural dead zone suffers a fall. TripGuardian detects the emergency, provides first-aid guidance offline, and automatically sends SOS alerts once any signal is available.

## 🔒 Privacy
- No cloud inference
- No persistent storage
- User-controlled consent
- One-tap kill switch

## 🏆 Hackathon Context
Built for the RunAnywhere Local AI Ideathon.
