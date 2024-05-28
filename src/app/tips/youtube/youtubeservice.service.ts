import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeserviceService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/playlists';

  constructor(private http: HttpClient) {}

  getChannelVideos(channelId: string, apiKey: string): Observable<any> {
    const url = `${this.apiUrl}?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=25&key=${apiKey}`;
    
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('YouTube API Error:', error);
        return throwError('Error fetching YouTube data. Please try again later.');
      })
    );
  }
}
// https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UC4PqUEXhJg6CFOC17oZfOyw&maxResults=25&key=[YOUR_API_KEY]
// default google developers channel Id => UC_x5XG1OV2P6uZZ5FSM9Ttw
// lee channel id => UCl_wI5knL6BbYq8K5ldCZzQ
