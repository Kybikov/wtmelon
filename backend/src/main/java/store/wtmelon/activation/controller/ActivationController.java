package store.wtmelon.activation.controller;

import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import store.wtmelon.activation.dto.ActivationCheckRequest;
import store.wtmelon.activation.dto.ActivationRedeemRequest;
import store.wtmelon.activation.service.KeysOvhService;

@RestController
@RequestMapping("/api/activation")
public class ActivationController {

    private final KeysOvhService keysOvhService;

    public ActivationController(KeysOvhService keysOvhService) {
        this.keysOvhService = keysOvhService;
    }

    @PostMapping("/check")
    public Map<String, Object> check(@Valid @RequestBody ActivationCheckRequest request) {
        return keysOvhService.checkKey(request.key());
    }

    @PostMapping("/redeem")
    public Map<String, Object> redeem(@Valid @RequestBody ActivationRedeemRequest request) {
        return keysOvhService.activate(request.key(), request.userToken());
    }
}
