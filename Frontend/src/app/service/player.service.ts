import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerModel } from '../models/player.model';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    constructor() {}

    getPlayer(): PlayerModel[] { 
        const players = localStorage.getItem('players')!; 
        return players ? JSON.parse(players) : [];
    }

    addPlayer(player: PlayerModel) { 
        const playerOriginal = this.getPlayer();
        playerOriginal.push(player);
        this.setPlayerToLocal(playerOriginal);
    }

    addMutiplePlayers(playerList: PlayerModel[]) { 
        let playerOriginal = this.getPlayer();
        playerOriginal = playerOriginal.concat(playerList);
        this.setPlayerToLocal(playerOriginal);
    }

    removePlayer(player: PlayerModel) { 
        let playerOriginal = this.getPlayer() ;
        if(playerOriginal.length) { 
            playerOriginal = playerOriginal.filter((item: any) => item.id !== player.id)
            this.setPlayerToLocal(playerOriginal);
        }
    }

    setPlayerToLocal(players: PlayerModel[]) { 
        localStorage.setItem('players', JSON.stringify(players));
    }

}
