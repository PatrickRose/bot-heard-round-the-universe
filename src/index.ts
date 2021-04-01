import { config } from 'dotenv';
import container from './inversify.config';
import { TYPES } from './types';
import { Bot } from './bot';

config(); // Recommended way of loading dotenv

const bot = container.get<Bot>(TYPES.Bot);
bot.listen()
    .then(() => {
        console.log('Logged in!');
    })
    .catch((error) => {
        console.log('Oh no! ', error);
    });
