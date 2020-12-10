import { Injectable } from "@angular/core"
import { ToastController } from "@ionic/angular"

@Injectable({
    providedIn: "root"
})

export class ToastService {

    constructor(public toastController: ToastController) {}

    async mensaje(titulo,mensaje, color = "primary") {
        const toast = await this.toastController.create({
            header: titulo,
            message: mensaje,
            position: "top",
            color: color,
            duration: 5000,
            buttons: [
                {
                    text: "X",
                    role: "cancel",
                    handler: () => {
                        console.log("Cancel clicked")
                    }
                }
            ]
        })

        toast.present()
    }
}
