package store.wtmelon.activation.service;

import java.util.Map;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

@Service
public class KeysOvhService {

    private final WebClient webClient;

    public KeysOvhService(WebClient keysOvhWebClient) {
        this.webClient = keysOvhWebClient;
    }

    public Map<String, Object> checkKey(String key) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/key/{code}/status").build(key))
                .retrieve()
                .onStatus(HttpStatusCode::isError, response -> response.bodyToMono(Map.class)
                        .map(body -> new ResponseStatusException(response.statusCode(), messageFrom(body))))
                .bodyToMono(Map.class)
                .block();
    }

    public Map<String, Object> activate(String key, String userToken) {
        return webClient.post()
                .uri("/activate")
                .bodyValue(Map.of("key", key, "user_token", userToken))
                .retrieve()
                .onStatus(HttpStatusCode::isError, response -> response.bodyToMono(Map.class)
                        .map(body -> new ResponseStatusException(response.statusCode(), messageFrom(body))))
                .bodyToMono(Map.class)
                .block();
    }

    private String messageFrom(Map<?, ?> body) {
        Object message = body.get("message");
        if (message != null) {
            return message.toString();
        }

        Object error = body.get("error");
        return error != null ? error.toString() : "Request failed";
    }
}
