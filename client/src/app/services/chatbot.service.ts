// src/app/services/chatbot.service.ts - Service for chatbot communication

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Corrected import path

// Define an interface for chat messages
export interface Message {
  text: string;
  sender: 'user' | 'ai';
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = environment.backendUrl + '/api/chatbot'; // Backend chatbot endpoint

  constructor(private http: HttpClient) { }

  /**
   * Sends a user message to the backend chatbot API and returns the AI's response.
   * @param message The user's message.
   * @returns An Observable of the AI's response message.
   */
  getChatbotResponse(message: string): Observable<Message> {
    return this.http.post<{ reply: string }>(this.apiUrl, { message }).pipe(
      map(response => ({ text: response.reply, sender: 'ai' }))
    );
  }
}
