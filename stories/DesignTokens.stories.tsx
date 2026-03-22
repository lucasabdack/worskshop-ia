import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Helper DS / Design Tokens",
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "white" } },
};

export default meta;

const ColorSwatch = ({
  name,
  hex,
  textDark = false,
}: {
  name: string;
  hex: string;
  textDark?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <div
      className="w-12 h-12 rounded-lg border border-neutral-pure shrink-0"
      style={{ background: hex }}
    />
    <div>
      <p
        className={`font-body text-sm font-semibold ${textDark ? "text-neutral-darkest" : "text-neutral-darkest"}`}
      >
        {name}
      </p>
      <p className="font-body text-xs text-neutral-dark">{hex}</p>
    </div>
  </div>
);

export const Colors: StoryObj = {
  render: () => (
    <div className="p-6 space-y-8">
      {/* Primary */}
      <section>
        <h2 className="font-display font-bold text-xl mb-4">Primary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorSwatch name="primary-pure" hex="#321CB2" />
          <ColorSwatch name="primary-light" hex="#5B4FCA" />
          <ColorSwatch name="primary-lightest" hex="#C8C2EB" />
          <ColorSwatch name="primary-dark" hex="#1E1180" />
          <ColorSwatch name="primary-darkest" hex="#0D0850" />
        </div>
      </section>

      {/* Success */}
      <section>
        <h2 className="font-display font-bold text-xl mb-4">Success</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorSwatch name="success-pure" hex="#34C47C" />
          <ColorSwatch name="success-light" hex="#E8F5EE" />
          <ColorSwatch name="success-low" hex="#0F5C33" />
        </div>
      </section>

      {/* Warning */}
      <section>
        <h2 className="font-display font-bold text-xl mb-4">Warning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorSwatch name="warning-pure" hex="#F5A623" />
          <ColorSwatch name="warning-light" hex="#FFF4E0" />
          <ColorSwatch name="warning-low" hex="#7A4800" />
        </div>
      </section>

      {/* Error */}
      <section>
        <h2 className="font-display font-bold text-xl mb-4">Error</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorSwatch name="error-pure" hex="#E03A3A" />
          <ColorSwatch name="error-light" hex="#FDEAEA" />
        </div>
      </section>

      {/* Info */}
      <section>
        <h2 className="font-display font-bold text-xl mb-4">Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorSwatch name="info-pure" hex="#4A90D9" />
          <ColorSwatch name="info-light" hex="#E8F1FB" />
        </div>
      </section>

      {/* Neutral */}
      <section>
        <h2 className="font-display font-bold text-xl mb-4">Neutral</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorSwatch name="neutral-pure" hex="#E5E3E3" />
          <ColorSwatch name="neutral-light" hex="#F0F0F0" />
          <ColorSwatch name="neutral-dark" hex="#5A5A5A" />
          <ColorSwatch name="neutral-darkest" hex="#1A1A1A" />
          <ColorSwatch name="teal-gray" hex="#8B9EAD" />
        </div>
      </section>
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div className="p-6 space-y-6 bg-white">
      <div>
        <p className="text-xs text-neutral-dark mb-1">Livvic Bold 28px — display/title</p>
        <h1 className="font-display font-bold text-[28px] text-neutral-darkest">
          Serviços residenciais
        </h1>
      </div>
      <div>
        <p className="text-xs text-neutral-dark mb-1">Livvic Bold 22px — section title</p>
        <h2 className="font-display font-bold text-[22px] text-neutral-darkest">
          Meu Perfil
        </h2>
      </div>
      <div>
        <p className="text-xs text-neutral-dark mb-1">Open Sans Bold 16px — btn-primary label</p>
        <p className="font-body font-bold text-base text-primary-pure">
          Confirmar agendamento
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-dark mb-1">Open Sans Regular 14px — body text</p>
        <p className="font-body text-sm text-neutral-darkest">
          Elétrica, hidráulica, limpeza e muito mais para sua primeira moradia.
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-dark mb-1">Open Sans Regular 12px — caption/meta</p>
        <p className="font-body text-xs text-neutral-dark">
          Próxima renovação: 01/04/2026
        </p>
      </div>
    </div>
  ),
};
