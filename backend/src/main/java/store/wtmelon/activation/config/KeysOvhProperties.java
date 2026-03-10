package store.wtmelon.activation.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "keys-ovh")
public record KeysOvhProperties(
        String baseUrl,
        String apiToken,
        String frontendOrigin
) {
}
