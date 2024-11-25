#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const { fetchCryptoPrice } = require('./cryptic-check');
const key = require('../commands/key');

program
    .version(pkg.version);


const keyCommand = program
    .command('key')
    .description('Manage API Key -- https://nomics.com');

keyCommand
    .command('set')
    .description('Set API Key -- Get at https://nomics.com')
    .action(key.set);

keyCommand
    .command('show')
    .description('Show API Key')
    .action(key.show);

keyCommand
    .command('remove')
    .description('Remove API Key')
    .action(key.remove);

program
    .command('check <crypto>')
    .description('Check the coin price and info.')
    .action(async (crypto) => {
        try {
            console.log(`Fetching price for: ${crypto}...\n`);
            const priceData = await fetchCryptoPrice(crypto);
            console.log(`Name:        ${priceData.name}`);
            console.log(`Symbol:      ${priceData.symbol}`);
            console.log(`Price (USD): $${priceData.price}`);
            console.log(`Rank:        ${priceData.rank}`);
            console.log(`Market Cap:  $${priceData.marketCap}`);
        } catch (error) {
            console.error(`\nError: ${error.message}`);
        }
    });

program.parse(process.argv);