import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { NgModule } from "@angular/core";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { ChangePasswordComponent } from "../account/login-security/change-password/change-password.component";

const routes: Routes = [

    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '', redirectTo: 'login', pathMatch: 'full'
            },
            {
                path: 'login',
                component: SignInComponent,

            },
            {
                path: 'sign-up',
                component: SignUpComponent,

            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,

            }

        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule{}