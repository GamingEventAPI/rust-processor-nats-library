

export class ServerCommand {
  private _command?: string;
  private _arguments?: string;
  private _steamId?: string;
  private _timestamp: string;
  private _additionalProperties?: Map<String, object | string | number | Array<unknown> | boolean | null | number>;

  constructor(input: {
    command?: string,
    arguments?: string,
    steamId?: string,
    timestamp: string,
  }) {
    this._command = input.command;
    this._arguments = input.arguments;
    this._steamId = input.steamId;
    this._timestamp = input.timestamp;
  }

  get command(): string | undefined { return this._command; }
  set command(command: string | undefined) { this._command = command; }

  get arguments(): string | undefined { return this._arguments; }
  set arguments(arguments: string | undefined) { this._arguments = arguments; }

  get steamId(): string | undefined { return this._steamId; }
  set steamId(steamId: string | undefined) { this._steamId = steamId; }

  get timestamp(): string { return this._timestamp; }
  set timestamp(timestamp: string) { this._timestamp = timestamp; }

  get additionalProperties(): Map<String, object | string | number | Array<unknown> | boolean | null | number> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<String, object | string | number | Array<unknown> | boolean | null | number> | undefined) { this._additionalProperties = additionalProperties; }

  public marshal() : string {
    let json = '{'
    if(this.command !== undefined) {
      json += `"command": ${typeof this.command === 'number' || typeof this.command === 'boolean' ? this.command : JSON.stringify(this.command)},`; 
    }
    if(this.arguments !== undefined) {
      json += `"arguments": ${typeof this.arguments === 'number' || typeof this.arguments === 'boolean' ? this.arguments : JSON.stringify(this.arguments)},`; 
    }
    if(this.steamId !== undefined) {
      json += `"steam_id": ${typeof this.steamId === 'number' || typeof this.steamId === 'boolean' ? this.steamId : JSON.stringify(this.steamId)},`; 
    }
    if(this.timestamp !== undefined) {
      json += `"timestamp": ${typeof this.timestamp === 'number' || typeof this.timestamp === 'boolean' ? this.timestamp : JSON.stringify(this.timestamp)},`; 
    }
  
    if(this.additionalProperties !== undefined) { 
      for (const [key, value] of this.additionalProperties.entries()) {
        //Only render additionalProperties which are not already a property
        if(Object.keys(this).includes(String(key))) continue;
        json += `"${key}": ${typeof value === 'number' || typeof value === 'boolean' ? value : JSON.stringify(value)},`;
      }
    }

    //Remove potential last comma 
    return `${json.charAt(json.length-1) === ',' ? json.slice(0, json.length-1) : json}}`;
  }

  public static unmarshal(json: string | object): ServerCommand {
    const obj = typeof json === "object" ? json : JSON.parse(json);
    const instance = new ServerCommand({} as any);

    if (obj["command"] !== undefined) {
      instance.command = obj["command"];
    }
    if (obj["arguments"] !== undefined) {
      instance.arguments = obj["arguments"];
    }
    if (obj["steam_id"] !== undefined) {
      instance.steamId = obj["steam_id"];
    }
    if (obj["timestamp"] !== undefined) {
      instance.timestamp = obj["timestamp"];
    }

    //Not part of core properties
  
    if (instance.additionalProperties === undefined) {instance.additionalProperties = new Map();}
    for (const [key, value] of Object.entries(obj).filter((([key,]) => {return !["command","arguments","steam_id","timestamp"].includes(key);}))) {
    
      instance.additionalProperties.set(key, value as any);
    }
    return instance;
  }
}
    