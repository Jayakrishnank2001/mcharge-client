import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportComponent } from './pages/report/report.component';
import { OtpComponent } from './pages/otp/otp.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path:'otp',
        component:OtpComponent
    },
    {
        path: '',
        component: HeaderComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'report',
                component: ReportComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];

