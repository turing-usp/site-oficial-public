require('dotenv').config();
const Parser = require('rss-parser');
const { Pool } = require('pg');

const parser = new Parser();
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

async function fetchAndStoreArticles() {
    const feed = await parser.parseURL('https://medium.com/feed/turing-talks');
    count = 0;
    for (const item of feed.items) {
        const mediumId = item.guid;
        const summary = item['content:encodedSnippet'].split('\n')[1]?.trim()
        
        const exists = await pool.query('SELECT 1 FROM articles WHERE medium_id = $1', [mediumId]);
        
        
        
        if (exists.rows.length === 0) {
            try {
                await pool.query(
                    `INSERT INTO articles 
                    (medium_id, title, summary, author, image_url, medium_url, published_at)
                    VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                    [
                        mediumId,
                        item.title,
                        summary,
                        item.creator,
                        extractImage(item['content:encoded']),
                        item.link,
                        item.pubDate
                    ]
                );

                console.log("Inserido:", item.title);

            } catch (err) {
                console.error("Erro ao inserir:", err);
            }
        }
    }
    console.log('sync concluido');
}

function extractImage(html) {
    if (!html) return null;

    const match = html.match(/<img.*?src="(.*?)"/);
    return match ? match[1] : null;
}

fetchAndStoreArticles().finally(() => pool.end());