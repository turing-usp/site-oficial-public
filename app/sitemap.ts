import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.turingusp.com",
            lastModified: new Date(2026, 2, 7),
            priority: 1.0,
        },
        {   
            url: "https://www.turingusp.com/projetos",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://www.turingusp.com/contato",
            lastModified: new Date(2026, 2, 7),
            priority: 0.2,
        },
        {
            url: "https://www.turingusp.com/equipe",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://www.turingusp.com/turing-talks",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://www.turingusp.com/eventos",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://www.turingusp.com/cadastre-se",
            lastModified: new Date(2026, 2, 7),
            priority: 0.2,
        },
        {
            url: "https://www.turingusp.com/login",
            lastModified: new Date(2026, 2, 7),
            priority: 0.2,
        }
    ];
}