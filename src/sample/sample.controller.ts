import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    Res,
    Ip,
    HostParam,
    Headers,
    Header,
    Redirect,
} from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';

// @Controller({ host: 'admin.example.com' }) // sub-domain routing
@Controller('samples')
export class SampleController {
    constructor(private readonly sampleService: SampleService) {}

    @Post()
    create(@Body() createSampleDto: CreateSampleDto): string {
        return this.sampleService.create(createSampleDto);
    }

    @Get()
    findAll(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
        @Ip() ip: string,
        @HostParam() hosts: object,
        @Headers('user-agent') headers: string,
    ): void {
        console.log('data:', request.url, ip, hosts, headers);
        response
            .cookie('cookie', 'cookie-value', {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 1 * 24 * 60 * 60 * 1000,
            })
            .send({ status: 'ok' });
        // return this.sampleService.findAll();
    }

    // pattern based
    @Get('sa*k')
    @Redirect('http://localhost:3000/samples', 301) // redirect requests
    @Header('X-Powered-By', 'none') // setting custom response headers
    getPatternBased() {
        const condition = true;
        if (!condition) {
            return { url: 'https://docs.nestjs.com/v5/' }; // redirect conditionally
        }
        return 'This route uses a wildcard';
    }

    @Get('observable')
    sendObservable(): Observable<any[]> {
        // using observables
        return of([]);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sampleService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
        return this.sampleService.update(+id, updateSampleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sampleService.remove(+id);
    }
}
