'use server'

import { BaseSyntheticEvent } from 'react'

export async function contactFormHandler(data: BaseSyntheticEvent) {
  console.log(data);
  return fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error))
}
