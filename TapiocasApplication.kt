package com.netolanches.Tapiocas

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.boot.autoconfigure.domain.EntityScan

@SpringBootApplication
@EnableJpaRepositories("com.netolanches.Tapiocas")  // Certifique-se de incluir a pasta onde seus repositórios estão
@EntityScan("com.netolanches.Tapiocas")  // Certifique-se de incluir a pasta onde suas entidades estão
class TapiocasApplication

fun main(args: Array<String>) {
	runApplication<TapiocasApplication>(*args)
}
