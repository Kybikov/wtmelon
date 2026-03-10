package store.wtmelon.activation.dto;

import jakarta.validation.constraints.NotBlank;

public record ActivationCheckRequest(
        @NotBlank(message = "Key is required")
        String key
) {
}
