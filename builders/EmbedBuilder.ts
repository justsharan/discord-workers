export class Embed {
  constructor(private base: any = {}) {}

  title(title: string): Embed {
    this.base.title = title;
    return this;
  }

  URL(url: string): Embed {
    this.base.url = url;
    return this;
  }

  description(description: string): Embed {
    this.base.description = description;
    return this;
  }

  color(color: number): Embed {
    this.base.color = color;
    return this;
  }

  author(name: string, icon?: string, url?: string): Embed {
    this.base.author = { name, icon_url: icon, url };
    return this;
  }

  timestamp(time: number | string | Date): Embed {
    this.base.timestamp = new Date(time).toISOString();
    return this;
  }

  footer(text: string, icon?: string): Embed {
    this.base.footer = { text, icon_url: icon };
    return this;
  }

  field(name: string, value: string, inline = false): Embed {
    if (!this.base.fields || !this.base.fields.length) {
      this.base.fields = [];
    }
    this.base.fields.push({ name, value, inline });
    return this;
  }

  blankField(inline = false): Embed {
    return this.field("\u200B", "\u200B", inline);
  }

  image(url: string): Embed {
    this.base.image = { url };
    return this;
  }

  thumbnail(url: string): Embed {
    this.base.thumbnail = { url };
    return this;
  }

  toJSON(): any {
    return this.base;
  }

  toMessage(): any {
    return { embeds: [this.base] };
  }
}
