package store.wtmelon.activation.dto;

import jakarta.validation.constraints.NotBlank;

public record ActivationRedeemRequest(
        @NotBlank(message = "Key is required")
        String key,
        @NotBlank(message = "User token is required")
        String userToken
) {
}
