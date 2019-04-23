import React from 'react'
 

export function api<T>(url: string): Promise<T> {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        return response.json();       
      })
      .then(function(data) {
        console.log(data);
        return data as T
      })

      .catch((error: Error) => {
        throw error;
      });
  }
