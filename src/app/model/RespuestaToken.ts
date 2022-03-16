export class RespuestaToken {

    constructor(
      public access_token: string = '',
      public token_type?: boolean | null,
      public refresh_token?: string | null,
      public expires_in?: number | null,
      public scope?: string | null,
      public idUsuario?: number | null,
      public usuario?: string | null,
      public tipoUsuario?: string | null,
      public nombre: string = '',
      public status?: boolean | null,
      public jti?: string | null,
      public error?: string | null,
      public error_description?: string | null
    ) {  }
  
}