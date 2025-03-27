package com.example.powerstation.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        // Permite que qualquer origem acesse sua API
        registry.addMapping("/**") // Configura o CORS para todas as rotas da sua API
            .allowedOrigins("http://localhost:5173") // Permite requisições do frontend em localhost:5173
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Permite os métodos HTTP desejados
            .allowedHeaders("*") // Permite todos os cabeçalhos
            .allowCredentials(true) // Permite envio de credenciais (cookies, tokens, etc)
    }
}
