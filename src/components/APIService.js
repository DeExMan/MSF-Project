import React, {useState} from 'react';
import {useCookies} from 'react-cookie';


export default class APIService {
    // Обновление Ристалища
    static UpdateTiltyard(tiltyard_id, body, token) {
        
        return fetch (`http://127.0.0.1:8000/api/tiltyards/${tiltyard_id}/`, {
            'method': "PUT",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body:JSON.stringify(body)
        
        
        }).then(resp => resp.json())
    }
    // Создание Ристалища
    static InsertTiltyard (body, token) {

        return fetch (`http://127.0.0.1:8000/api/tiltyards/`, {
            'method': "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
            }, 
            body:JSON.stringify(body)
            
        })


    }
    
    // Удаление Ристалища
    static DeleteTiltyard (tiltyard_id, token) {
        return fetch (`http://127.0.0.1:8000/api/tiltyards/${tiltyard_id}/`, {
            'method': "DELETE",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
            },
            
        })


    }


    // Логин
    static LoginUser (body) {

        return fetch (`http://127.0.0.1:8000/auth/`, {
            'method': "POST",
            headers: {
            'Content-Type': 'application/json',
            
            }, 
            body:JSON.stringify(body)
            
        }).then(resp => resp.json())


    }

    // Бойцы
    static InsertFighter (body, token) {
        return fetch (`http://127.0.0.1:8000/api/fighters/`, {
            'method': "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
            },  
            body:JSON.stringify(body)
            
        }).then(resp => resp.json())
        .catch(error => console.log(error))


    }

    static UpdateFighter (id, body, token) {
        return fetch (`http://127.0.0.1:8000/api/fighters/${id}/`, {
            'method': "PUT",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
            },  
            body:JSON.stringify(body)
            
        }).then(resp => resp.json())
        .catch(error => console.log(error))


    }

    static DeleteFighter (id, token) {
        return fetch (`http://127.0.0.1:8000/api/fighters/${id}/`, {
            'method': "DELETE",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
            },
            
        })


    }

}