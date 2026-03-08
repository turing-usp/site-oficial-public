import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://turingusp.com",
            lastModified: new Date(2026, 2, 7),
            priority: 1.0,
        },
        {   
            url: "https://turingusp.com/projetos",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/contato",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/equipe",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/turing-talks",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/eventos",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/cadastre-se",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/login",
            lastModified: new Date(2026, 2, 7),
            priority: 0.8,
        }
    ];
}