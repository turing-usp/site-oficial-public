import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://turingusp.com",
            lastModified: new Date(),
            priority: 1.0,
        },
        {   
            url: "https://turingusp.com/projetos",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/contato",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/equipe",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/turing-talks",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/eventos",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/cadastre-se",
            lastModified: new Date(),
            priority: 0.8,
        },
        {
            url: "https://turingusp.com/login",
            lastModified: new Date(),
            priority: 0.8,
        }
    ];
}