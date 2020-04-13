const express = require('express');
const next = require('next');
const fs = require('fs');
const mp = require('mercadopago');
const bodyParser = require('body-parser');

// If is in the Development or Production Mode
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
const app = next({ dev });

// Configure Mercado Pago
mp.configure({
  client_id: 3970737792166882,
  client_secret: 'JcSiqEeoqKVQzgIBWmajg7nlSoKBYo54',
  sandbox: true,
});

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.get('/', (req, res) => {
    res.redirect('/shop', 302);
  });

  server.get('/shop', (req, res) => {
    return app.render(req, res, '/shop', req.query)
  });

  server.get('/success', (req, res) => {
    return app.render(req, res, '/success', req.query)
  });

  server.get('/failure', (req, res) => {
    return app.render(req, res, '/failure', req.query)
  });

  server.get('/pending', (req, res) => {
    return app.render(req, res, '/pending', req.query)
  });

  server.get('/api/items', (req, res) => {
    const json = JSON.parse(fs.readFileSync('./products.json'));
    res.json(json);
  });

  server.post('/api/pay', async (req, res) => {
    console.log(req.body.data);
    let data = req.body.data;

    data = data.map(item => {
      return {
        id: item.id,
        title: item.title,
        unit_price: item.price,
        quantity: item.ammount,
      }
    });

    const preference = {
      items: data,
      back_urls: {
        success: 'http://localhost:8080/success',
        failure: 'http://localhost:8080/failure',
        pending: 'http://localhost:8080/pending',
      },
      auto_return: 'approved',
      //notification_url: ''
    }

    console.log('preference', preference);

    const response = await mp.preferences.create(preference);

    console.log('res.json');
    console.log(response.body);

    res.json({ url: response.body.init_point });
  });

  server.all('*', (req, res) => {
    res.status(404);
    return app.render(req, res, '/_error', req.query);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  })
})