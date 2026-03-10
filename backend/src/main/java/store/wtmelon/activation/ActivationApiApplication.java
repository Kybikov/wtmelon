package store.wtmelon.activation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class ActivationApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ActivationApiApplication.class, args);
    }
}
